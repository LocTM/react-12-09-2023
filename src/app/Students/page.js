'use client';



import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { AppButton } from "../Components/app-button";
import { AppPagination } from "../Components/app-pagination";
import { studentService } from "../services/student.service";

export default function Students() {
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);
  const [pagination, setPagination] = useState({
    itemsPerPage: 5,
    pageIndex: 0,
  });
  
  const router = useRouter();
  const createNew = () => {
    router.push('/Students/Create');
  };

  const editStudent = (id) => {
    router.push(`/Students/${id}`);
  };  

  const getGender = (value) => {
    if (value === 'M') {
      return "Male";
    }
    if (value === 'F') {
      return "Female";
    }
    return "";
  };

  const searchStudents = async () => {
    const result = await studentService.findStudents(filters, pagination);
    setSearchResult(result);
  };

  const confirmDelete = (student) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa?  "${student.name}"`)){
      return;
    }
    studentService.deleteStudent(student.id);
    alert("Xóa thành công");
    searchStudents();
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
    searchStudents();
  }, [filters.gender, searchTermDebounced]);

  useEffect(() => {
    searchStudents();
  }, [pagination.pageIndex]);

  return (
    <div className=" bg-blue-800 min-h-screen min-w-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <div className="text-2xl font-bold">Students</div>
        <AppButton className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          <div>
            <div className="text-lg font-bold">Search students</div>
          </div>
          <div>
            <input 
            name="searchTerm" 
            className="border border-solid" 
            value={filters.searchTerm} 
            onChange={(e) => {
              setFilters({
                ...filters,
                searchTerm: e.target.value,
              });
            }}
          />
          </div> 
          <div className="mb-4">
            <label className="">Gender</label>
            <div>
              <label htmlFor="rdAll" className="inline-block mr-2">
                <input
                  id="rdAll"
                  name="gender"
                  type="radio"
                  className="mr-2"
                  value=""
                  checked={filters.gender === ""}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      gender: e.target.value,
                    });
                  }}
                />
                All
              </label>              
              <label htmlFor="rdMale" className="inline-block mr-2">
                <input
                  id="rdMale"
                  name="gender"
                  type="radio"
                  className="mr-2"
                  value="M"
                  checked={filters.gender === "M"}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      gender: e.target.value,
                    });
                  }}
                />
                Male
              </label>
              <label htmlFor="rdFemale" className="inline-block">
                <input
                  id="rdFemale"
                  name="gender"
                  type="radio"
                  className="mr-2"
                  value="F"
                  checked={filters.gender === "F"}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      gender: e.target.value,
                    });
                  }}
                />
                Female
              </label>
            </div>
          </div>       
          {searchResult.data
          .map((student) => (
            <div key={student.id} className="border border-solid border-black p-2 mt-2">
              <div>Name: {student.name}</div>
              <div>Age: {student.age}</div>
              <div>Gender: {getGender(student.gender)}</div>
              <div>
                <AppButton className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"  color="red" onClick={() => confirmDelete(student)}>
                  Delete
                </AppButton>
                <AppButton  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => editStudent(student.id)}>
                  Edit
                </AppButton>                
              </div>
            </div>
          ))}
          <AppPagination className=""
            {...pagination} 
            total={searchResult.total} 
            setPageIndex={(newPageIndex) => {
              setPagination({
                ...pagination,
                pageIndex: newPageIndex,
              })
            }
          }
        />
        </div>
      </div>
    </div>
  );
}