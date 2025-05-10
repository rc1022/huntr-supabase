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
    <div className="w-full flex flex-col justify-center items-center font-sgothic md:pl-10 space-y-3">
      <span className="border-b-2">sort by</span>

      <div className="mt-2 flex flex-row text-sm space-x-5">
        <button name="priority_desc"
          onClick={(e) => handleClick(e)}
          className={`${prioritySort === "priority_desc" ? "border-main" : "border-ivory" } border-2 option-animate`}>
        Low → High
        </button>

        <button name="priority_asc"
          onClick={(e) => handleClick(e)}
          className={`${prioritySort === "priority_asc" ? "border-main" : "border-ivory" } border-2 option-animate`}>
        High → Low
        </button>

      </div>



    </div>
  )
}

export default SortingOptions