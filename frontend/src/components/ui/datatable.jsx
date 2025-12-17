"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { ChevronDown } from "lucide-react";

export default function DataTable({
  columns,
  data,
  searchKey,

  filters = [],
  exports = [],

  manualPagination = false,
  pageCount = 1,
  totalRows = 0,

  onPaginationChange,
  onSortChange,
}) {
  // ------------------------------
  // 🔥 Internal Pagination State
  // ------------------------------
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const isServer = manualPagination === true;

  // ------------------------------
  // 🔥 Debug Logs
  // ------------------------------
  console.log("🟦 DataTable Rendered");
  console.log("🔹 manualPagination:", isServer);
  console.log("🔹 pageIndex:", pageIndex);
  console.log("🔹 pageSize:", pageSize);
  console.log("🔹 incoming data length:", data?.length);

  // ------------------------------
  // 🔥 Server Pagination Callback
  // ------------------------------
  React.useEffect(() => {
    if (!isServer || !onPaginationChange) return;

    console.log("📡 Server pagination triggered:", {
      page: pageIndex + 1,
      limit: pageSize,
    });

    onPaginationChange({
      page: pageIndex + 1,
      limit: pageSize,
    });
  }, [pageIndex, pageSize]);

  // ------------------------------
  // 🔥 Build the Table
  // ------------------------------
  const table = useReactTable({
    data,
    columns,

    state: {
      pagination: { pageIndex, pageSize },
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      console.log("🔸 Pagination updated:", next);

      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },

    manualPagination: isServer,
    pageCount: isServer ? pageCount : undefined,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: isServer ? undefined : getPaginationRowModel(),
  });

  console.log("🔹 rows displayed in table:", table.getRowModel().rows.length);

  return (
    <div className="w-full">

      {searchKey && (
        <div className="flex items-center py-4 gap-3">
          <Input
            placeholder={`Search ${searchKey}...`}
            onChange={(e) => {
              table.getColumn(searchKey)?.setFilterValue(e.target.value);
            }}
            className="max-w-sm"
          />
          {filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  Filters <ChevronDown className="ml-1 h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-40">
                {filters.map((f, idx) => (
                  <DropdownMenuCheckboxItem
                    key={idx}
                    checked={false} // not tracking checked state (one-shot filter action)
                    onCheckedChange={() => {
                      console.log("🎛 Filter applied:", f.label);
                      f.action();
                    }}
                  >
                    {f.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {exports.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  Export <ChevronDown className="ml-1 h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                {exports.map((exp, idx) => (
                  <DropdownMenuCheckboxItem
                    key={idx}
                    checked={false}
                    onCheckedChange={() => {
                      console.log("📤 Export Triggered:", exp.label);
                      exp.action();
                    }}
                  >
                    {exp.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => {
                    console.log("👁 Toggle column:", column.id, v);
                    column.toggleVisibility(!!v);
                  }}
                >
                  {column.columnDef.column_name || column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* ------------------------------ */}
      {/* 📊 TABLE */}
      {/* ------------------------------ */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort =
                    !!onSortChange && header.column.columnDef.enableSorting;

                  return (
                    <TableHead
                      key={header.id}
                      className={canSort ? "cursor-pointer select-none" : ""}
                      onClick={() => {
                        if (!canSort) return;

                        const direction =
                          header.column.getIsSorted() === "asc"
                            ? "desc"
                            : "asc";

                        console.log("↕ Sort triggered:", {
                          column: header.column.id,
                          direction,
                        });

                        onSortChange({
                          sortBy: header.column.id,
                          order: direction,
                        });
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ------------------------------ */}
      {/* ⏪ PAGINATION FOOTER */}
      {/* ------------------------------ */}
      <div className="flex items-center justify-between py-4">
        {isServer ? (
          <div className="text-sm text-muted-foreground">
            Page {pageIndex + 1} of {pageCount} • Total {totalRows}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Page {pageIndex + 1} • Showing {table.getRowModel().rows.length}{" "}
            rows
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* PAGE SIZE SELECT */}
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              console.log("📏 Page size changed:", value);
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>

            <SelectContent>
              {[10, 20, 30, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  Show {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* PREVIOUS */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          {/* NEXT */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
