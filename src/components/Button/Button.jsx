
import React from 'react'

function Button({ loadMoreActive, imagesArray, loadMoreHandler }) {   

        return (
            <button
                type="button"
                className="load-more"
                onClick={loadMoreHandler}
                style={{ width: '500px', height: '70px', fontSize: '20px', display: loadMoreActive && imagesArray.length > 0 ? 'block' : 'none'} }
            >
                Load More
            </button>
        )
    };


export default Button;