import React from 'react'
import styles from "../Inventory.module.scss"

interface FilterPanelProps {
  setFilter: (filter: { status?: string; sortPrice?: "asc" | "desc" }) => void
  setSearch: (search: string) => void
  setIsModalOpen: (open: boolean) => void
  search: string
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  setFilter,
  setSearch,
  setIsModalOpen,
  search
}) => {
  return (
    <div className={styles.filtersContainer}>
      <button
        className={styles.addButton}
        onClick={() => setIsModalOpen(true)}
      >
        + Add New Product
      </button>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filters}>
        <button onClick={() => setFilter({ status: "displayed" })}>
          Displayed
        </button>
        <button onClick={() => setFilter({ status: "archived" })}>
          Archived
        </button>
        <button onClick={() => setFilter({ sortPrice: "asc" })}>
          Price ↑
        </button>
        <button onClick={() => setFilter({ sortPrice: "desc" })}>
          Price ↓
        </button>
        <button
          onClick={() => {
            setFilter({});
            setSearch("");
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FilterPanel