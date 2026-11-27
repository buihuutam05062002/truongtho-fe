import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MENU_PAGE_SIZE, PRICE_RANGES, SORT_OPTIONS } from "../constants"

const DEBOUNCE_MS = 350


export function useMenuFilters() {
    const [params, setParams] = useSearchParams()

    const rawCat = params.get("cat") ?? ""
    const cat = /^\d+$/.test(rawCat) ? rawCat : ""
    const rawPrice = params.get("price")
    const price = PRICE_RANGES.some((r) => r.key === rawPrice) ? rawPrice : "all"
    const rawSort = params.get("sort")
    const sort = SORT_OPTIONS.some((s) => s.key === rawSort) ? rawSort : "DEFAULT"

    const rawPage = Number(params.get("page"))
    const page = Number.isInteger(rawPage) && rawPage > 1 ? rawPage - 1 : 0

    const [keyword, setKeyword] = useState(params.get("q") ?? "")
    const [debounced, setDebounced] = useState(keyword)
    const writtenQ = useRef(keyword.trim()) 

    useEffect(() => {
        const t = setTimeout(() => setDebounced(keyword), DEBOUNCE_MS)
        return () => clearTimeout(t)
    }, [keyword])

    const setParam = useCallback(
        (key, value) =>
            setParams(
                (prev) => {
                    const next = new URLSearchParams(prev)
                    if (value) next.set(key, value)
                    else next.delete(key)
                    if (key !== "page") next.delete("page")
                    return next
                },
                { replace: true }
            ),
        [setParams]
    )

    useEffect(() => {
        const q = debounced.trim()
        if (q === writtenQ.current) return
        writtenQ.current = q
        setParam("q", q)
    }, [debounced, setParam])

    const apiParams = useMemo(() => {
        const range = PRICE_RANGES.find((r) => r.key === price)
        return {
            keyword: debounced.trim() || undefined,
            minPrice: range?.minPrice,
            maxPrice: range?.maxPrice,
            size: MENU_PAGE_SIZE,
        }
    }, [debounced, price])

    const reset = useCallback(() => {
        writtenQ.current = ""
        setKeyword("")
        setDebounced("")
        setParams(
            (prev) => {
                const next = new URLSearchParams(prev)
                ;["q", "cat", "price", "page"].forEach((k) => next.delete(k))
                return next
            },
            { replace: true }
        )
    }, [setParams])

    return {
        keyword,
        setKeyword,
        cat,
        setCat: (v) => setParam("cat", v),
        price,
        setPrice: (v) => setParam("price", v === "all" ? "" : v),
        sort,
        setSort: (v) => setParam("sort", v === "DEFAULT" ? "" : v),
        page,
        setPage: (n) => setParam("page", n > 0 ? String(n + 1) : ""),
        hasActive: Boolean(debounced.trim() || cat || price !== "all"),
        apiParams,
        reset,
    }
}