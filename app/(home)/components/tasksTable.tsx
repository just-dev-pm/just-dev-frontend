"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { number } from "zod";
import useSWR from "swr";
import { BASE_URL } from "@/lib/global";
import { useUserInfo } from "@/app/api/useUserInfo";

// const testdata: Task[] = [
//   {
//     id: "1",
//     name: "吃饭",
//     status: "success",
//     deadline: "2024-07-09",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "2",
//     name: "喝水",
//     status: "success",
//     deadline: "2024-07-10",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "3",
//     name: "睡觉",
//     status: "processing",
//     deadline: "2024-07-11",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "3",
//     name: "开发",
//     status: "success",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "4",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "5",
//     list_id: "2",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "4",
//     list_id: "3",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "2",
//     list_id: "3",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "3",
//     list_id: "2",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "3",
//     list_id: "1",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
//   {
//     id: "2",
//     list_id: "1",
//     name: "打电动",
//     status: "failed",
//     deadline: "2024-07-12",
//     collaborators: [
//       "https://github.com/shadcn.png",
//       "https://github.com/shadcn.png",
//     ],
//     description: "",
//   },
// ];

export type Task = {
  id: string;
  list_id: string;
  name: string;
  description: string;
  status: "pending" | "processing" | "success" | "failed";
  deadline: string;
  assignees: string[];
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const list_id = row.original.list_id;
      const id = row.original.id;
      return (
        <Link href={`./${list_id}/${id}`} className="capitalize">
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "assignees",
    header: "Assignees",
    cell: ({ row }) => {
      const collaborators: string[] = row.original.assignees;
      if (collaborators)
        return collaborators.map((c_user_id) => {
          const { data, error } = useUserInfo({ userId: c_user_id });
          const avatar = data.avatar;
          return (
            <Avatar className="inline-block">
              <AvatarImage src={avatar}></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          );
        });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      const status_item = status.status_item.category;
      return <Badge className="capitalize">{status_item}</Badge>;
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("deadline")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ task_list_id }: { task_list_id: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const urlPrefix = `/api/task_lists/`;
  const urlSuffix = `/tasks`;
  const { data, error } = useSWR(
    task_list_id ? [urlPrefix, task_list_id, urlSuffix] : null,
    ([urlPrefix, task_list_id, urlSuffix]) =>
      fetch(BASE_URL + urlPrefix + task_list_id + urlSuffix, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error! Status:${res.status}`);
        }
        return res.json();
      }),
    { suspense: true, fallbackData: { tasks: [] } }
  );
  const dialog_data: Task[] = data.tasks;

  dialog_data.forEach((task) => {
    // 直接添加 list_id 属性到每个 Task 对象
    task.list_id = task_list_id;
  });

  console.log("dialog_data_with_list_id", dialog_data);

  const table = useReactTable({
    data: dialog_data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter deadline..."
          value={
            (table.getColumn("deadline")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("deadline")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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
