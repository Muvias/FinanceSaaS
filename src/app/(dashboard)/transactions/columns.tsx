"use client"

import { client } from "@/lib/hono"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { InferResponseType } from "hono"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { formatCurrency } from "@/lib/utils"
import { Actions } from "./actions"

import { AccountColumn } from "./account-column"
import { CategoryColumn } from "./category-column"

import { ArrowUpDownIcon } from "lucide-react"

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0]

export const columns: ColumnDef<ResponseType>[] = [
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
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;

      return (
        <span>
          {format(date, "dd MMM, yyy")}
        </span>
      )
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <CategoryColumn
        id={row.original.id}
        category={row.original.category}
        categoryId={row.original.categoryId}
      />
    )
  },
  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Beneficiário
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantia
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <Badge
          variant={amount < 0 ? "destructive" : "primary"}
          className="px-3.5 py-2.5 text-xs font-medium"
        >
          {formatCurrency(amount)}
        </Badge>
      )
    }
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Conta
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <AccountColumn
        account={row.original.account}
        accountId={row.original.accountId}
      />
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  }
]
