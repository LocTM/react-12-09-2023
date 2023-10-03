'use client';



import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { ThemeContext } from "../contexts/theme.context";
import { AppButton } from "../Components/app-button";
import { studentService } from "../services/student.services";
import { AppPagination } from "../Components/app-pagination";

export default function Students() {
  const theme = useContext(ThemeContext);
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
    if (!window.confirm(`Are you sure you want to delete student  "${student.name}"`)){
      return;
    }
    studentService.deleteStudent(student.id);
    alert("Delete successfully");
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
    <>
    <div className="bg-blue-700 min-h-screen">
      <div className="container mx-auto text-center ">
        <div>Theme: {theme}</div>
        <div className="text-4xl font-bold">Students</div>
        <AppButton className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          <div>
            <div className="mt-2 text-lg font-bold">Search students</div>
          </div>
          <div>
            <input 
            name="searchTerm" 
            className="border border-solid mt-2" 
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
            <label className="block mt-2 text-8sm font-semibold">Gender</label>
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
            <div key={student.id} className="border border-solid p-2 mt-2">
              <div>Name: {student.name}</div>
              <div>Age: {student.age}</div>
              <div>Gender: {getGender(student.gender)}</div>
              <div>
                <AppButton className="px-4 py-2 text-sm rounded-full cursor-pointer mr-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={() => confirmDelete(student)}>
                  Delete
                </AppButton>
                <AppButton className="px-4 py-2 text-sm rounded-full cursor-pointer mr-4 bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-2 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => editStudent(student.id)}>
                  Edit
                </AppButton>                
              </div>
            </div>
          ))}
          <AppPagination
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
    </>
  );
}