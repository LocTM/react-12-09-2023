import { AppButton } from "./app-button";


export const AppPagination = ({ 
    itemsPerPage, 
    pageIndex, 
    total, 
    setPageIndex 
}) => {
    const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
    const totalPage = lastPageIndex === - 1 ? 1 : lastPageIndex + 1;
    return (
        <div>
            <AppButton 
            className={pageIndex === 0 ?"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded": 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'} 
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            >
                Prev
            </AppButton>
            <span>
                Page {pageIndex + 1}/{totalPage}
            </span>
            <AppButton 
            className={
                pageIndex === lastPageIndex || lastPageIndex === - 1 ? "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded": 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            } 
            disabled={pageIndex === lastPageIndex || lastPageIndex === - 1}
            onClick={() => setPageIndex(pageIndex + 1)}
            >
                Next
            </AppButton>
            <span>Total: {total} items</span>            
        </div>
    );
};