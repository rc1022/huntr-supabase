import useJobs from "../hooks/useJobs"

function SortingOptions() {

  const { prioritySort, setPrioritySort } = useJobs();

  const handleClick = (e) => {
    if (prioritySort === e.target.name) {
      setPrioritySort('');
    } else {
      setPrioritySort(e.target.name);
    }
  }

  return (
    <div className="font-sgothic pl-10">
      <span className="border-b-2 mb-10">sort by</span>

      <div className="mt-2 flex flex-col text-sm space-y-5">
        <button name="priority_asc"
          onClick={(e) => handleClick(e)}
          className={`${prioritySort === "priority_asc" ? "border-main" : "border-ivory" } border-2`}>
        Low → High
        </button>

        <button name="priority_desc"
          onClick={(e) => handleClick(e)}
          className={`${prioritySort === "priority_desc" ? "border-main" : "border-ivory" } border-2`}>
        High → Low
        </button>

      </div>



    </div>
  )
}

export default SortingOptions