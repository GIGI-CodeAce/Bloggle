

function PostPageLayout(){

    return(
            <div className="px-4 pt-4 pb-1 max-w-2xl mx-auto relative overflow-hidden min-h-[300px]">
      <h1 className="flex h-[40px] font-bold mb-2 bg-gray-100 mx-auto p-1 rounded-b-3xl break-words">
      </h1>

      <p className="font-bold text-gray00 mb-4 w-[200px] h-[35px] bg-gray-100 mx-auto p-1 rounded-b-3xl">
      </p><hr /><br />

      <div className="text-xl h-[90px]">
        
        <h1 className="sm:w-[400px] w-[300px] bg-gray-100 h-[40px] mb-2 mx-auto rounded-2xl"></h1>
        <h1 className="sm:w-[500px] w-[400px] bg-gray-100 h-[40px] mx-auto rounded-2xl"></h1>
        </div>  
      <br/><hr />

      <div
        className={`mb-4 prose pt-2 max-w-none break-words`}
      ></div>

      <div className="relative">
                <div
          className="w-full mt-2 h-[400px] rounded-xl mb-4 border bg-gray-100"
        />

        <div
          className={`absolute z-50 items-center gap-2 top-5 right-5`}>
          <button
            className=" border-black border-2 animate-pulse w-[100px] h-[35px] bg-gray-100 cursor-pointer transition-all px-4 py-1 rounded-xl"
          >
          </button>
        </div>
      </div>

      <div className="flex items-center flex-wrap mb-5 h-[40px] rounded-t-xl bg-[#020303c9] p-2 w-full">
        {/* tags */}
        <div className="ml-auto text-sm opacity-80">
            {/* time ago */}
        </div>
      </div>
    </div>
    )
}

export default PostPageLayout