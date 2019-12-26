import React from 'react'


const linkPagination = (last_page,handlePageChange,actualPage) => {
    let links = []
    let active = ""

    for (let index = 1; index <= last_page; index++)  {
        
        index == actualPage ? active = "active" : active = ""

        links.push(
            <li key={index} className={`page-item ${active}`}><span className="page-link" onClick={() => handlePageChange(index)}>{index}</span></li>
        )
    }
    return links

}

const beforeOrNextLink = (name, actualPage, url, last_page,handlePageChange) => {

    let restOrPlus = 0
    name === 'previous' ? restOrPlus = actualPage - 1 : restOrPlus = actualPage + 1
    
    if ((actualPage <= 1 && name === 'previous') || (last_page === actualPage && name === 'next')) {
      return  <li className="page-item disabled"><span className="page-link" >{name}</span></li>
    
    }

    return <li className="page-item "  onClick={() => handlePageChange(restOrPlus)}><span className="page-link" >{name}</span></li>

    
}

const Pagination = (props) => {

    const { url, paginationData } = props
    const actualPage = parseInt(paginationData.current_page, 10)
    const lastPage = parseInt(paginationData.last_page, 10)
    console.log(`este el page actual ${actualPage}`)

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {beforeOrNextLink('previous', actualPage, url, lastPage,props.handlePageChange)}
                {linkPagination(paginationData.last_page,props.handlePageChange,actualPage)}
                {beforeOrNextLink('next', actualPage, url, lastPage,props.handlePageChange)}
            </ul>
        </nav>
    )
}



export default Pagination