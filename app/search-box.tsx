"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBox({ query, onSearch }: { query: string; onSearch: (query: string) => void }) {
  const [value, setValue] = useState(query);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form className="search-page-form" role="search" aria-label="雾搜搜索" onSubmit={submit}>
      <Input type="search" aria-label="搜索网站或关键词" placeholder="搜索网站或关键词" value={value} onChange={(event) => setValue(event.target.value)} autoComplete="off" spellCheck={false} />
      <Button type="submit" disabled={!value.trim()}>搜索</Button>
    </form>
  );
}
