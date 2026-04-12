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
        + Додати Продукт
      </button>

      <input
        type="text"
        placeholder="Шукати за назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filters}>
        <button onClick={() => setFilter({ status: "displayed" })}>
          Відображений
        </button>
        <button onClick={() => setFilter({ status: "archived" })}>
          Архівований
        </button>
        <button onClick={() => setFilter({ sortPrice: "asc" })}>
          Ціна ↑
        </button>
        <button onClick={() => setFilter({ sortPrice: "desc" })}>
          Ціна ↓
        </button>
        <button
          onClick={() => {
            setFilter({});
            setSearch("");
          }}
        >
          Очистити Фільтри
        </button>
      </div>
    </div>
  )
}

export default FilterPanel