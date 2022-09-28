import React, { useEffect, useState } from 'react'

const Main = () => {
  const [data, setData] = useState()
  const [menu, setMenu] = useState(false)
  const [change, setChange] = useState(false)
  const [addBookModal, setAddBookModal] = useState(false)
  const [addBookInput, setAddBookInput] = useState("")
  const storageUser = JSON.parse(localStorage.getItem("newdata"))
  const [bookDetails, setBookDetails] = useState(storageUser == null ? [] : storageUser)
  const [addBookMain, setAddBookMain] = useState(false)
  const [addCashModal, setAddCashModal] = useState(false)
  const [addAmount, setAddAmount] = useState("")
  const [addRemark, setAddRemark] = useState("")
  const [addCategory, setAddCategory] = useState("")
  const [addPaymentMode, setAddPaymentMode] = useState("")
  const [addName, setAddName] = useState("")
  const storageDetails = JSON.parse(localStorage.getItem("newbookData"))
  const [cashDetails, setCashDetails] = useState(storageDetails == null ? [] : storageDetails)
  const [cashIn, setCashin] = useState(false)

  function saved() {


    // cashin object
    const cashinpayment = {
      nameBook: addName,
      amount: addAmount,
      remark: addRemark,
      category: addCategory,
      paymentType: addPaymentMode,
      cashIn: cashIn,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString()
    }
    // cashindata.push(cashinpayment);


    // localhost
    const cashinData = JSON.parse(localStorage.getItem("newbookData"))

    if (cashinData == null) {

      localStorage.setItem("newbookData", JSON.stringify([cashinpayment]));
      setChange(!change)
    } else {
      localStorage.setItem("newbookData", JSON.stringify([...cashinData, cashinpayment]));
      setChange(!change)
    }

    setAddCashModal(false)

  }

  const showCashDetails = (name) => {
    setAddName(name)
    setAddBookMain(true)
  }

  useEffect(() => {
    setBookDetails(storageUser)
    setCashDetails(storageDetails)
  }, [change])


  function createNewBook() {

    const check = JSON.parse(localStorage.getItem("newdata"))

    if (check == null) {

      localStorage.setItem("newdata", JSON.stringify([addBookInput]));
      setChange(!change)
    } else {
      localStorage.setItem("newdata", JSON.stringify([...check, addBookInput]));
      setChange(!change)

    }
    setAddBookModal(false)



  }
  function del(time) {

    const filter = cashDetails.filter((value, index) => value.time !== time)
    localStorage.setItem("newbookData", JSON.stringify(filter));
    setChange(!change)

  }
  function cashModal(cash) {
    setCashin(cash)
    setAddCashModal(true)
  }

  const nameFilter = cashDetails?.filter((cash) => cash.nameBook == addName);
  console.log("nameFilter", nameFilter)

  const newCashin = nameFilter?.filter((cash) => cash.cashIn == true);

  const cashinSum = newCashin?.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);
  const newCashOut = nameFilter?.filter((cash) => cash.cashIn == false);

  const cashOutSum = newCashOut?.reduce((accumulator, object) => {
    return accumulator + Number(object.amount);
  }, 0);



  const show = () => {
    setMenu(!menu)

  }

  // console.log('Menu is ', menu)




  return (
    <>
      <div className=" lg:hidden bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
        <h1 className="lg:font-bold text-3xl ">Mayra Hasab NALO NAL</h1>

        {/* <span className='mt-2 px-3 py-1 border' onClick={show}><i class="fa fa-bars" aria-hidden="true"></i></span> */}
      </div>
      <div> <main className="  grid grid-cols-1 lg:grid-cols-7 bg-gray-800 min-h-screen ">
        <div className='border-r-2  lg:mr-3  border-blue-900 '>

          <nav aria-label="alternative nav  min-h-screen  lg:col-span-2  ">

            <div className=" bg-gray-800 shadow-xl min-h-screen  bottom-0    md:relative  z-10   content-center" style={{ height: '100% !important' }}>
              <div id="newbookadd" className="   ">
                <ul className="list-reset flex  flex-col md:flex-col items-center justify-center pt-3 md:py-3 px-1 md:px-2 text-center  md:text-left">



                  <li className=" flex justify-center w-full ">
                    <a href="#" className="block  ">

                      {/* side bar button */}
                      <button className="main_button  "
                        onClick={() => setAddBookModal(true)}
                      >

                        Add New Book
                      </button>

                    </a>
                  </li>
                  {bookDetails && bookDetails.map((value) =>
                  (
                    <>
                      <a className="block    w-2/3 mt-4  "  onClick={() =>{show(); showCashDetails(value)}}

                      >

                        <li className="border-solid whitespace-nowrap rounded-tl-3xl lg:px-14 px-12   text-center  font-bold hover:bg-gradient-to-r from-blue-900 to-gray-800 hover:text-white text-white border border-[#1F387E] rounded  py-3     ">{value}</li>
                      </a>
                    </>
                  ))}


                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* {menu ? 'lg:block' : 'hidden lg:block'} */}
        <div className=" col-span-7 lg:col-span-6  ">


          <section className="lg:w-full w-full  ">
            {/* app name */}
            <div className="bg-gray-800 order-2 hidden lg:block">
              <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 className="lg:font-bold text-3xl pl-2">Mayra Hasab NALO NAL</h1>
              </div>
            </div>

            {/* mine div jis my new book add hoti */}
            {addBookModal == true ?

              <div className=' flex justify-center fixed inset-0 lg:relative backdrop-blur-sm    lg:h-96 h-auto items-center w-auto '>
                <div className=' lg:w-[30%]  h-64 border rounded-xl bg-gradient-to-r from-blue-900 to-gray-800  '>
                  <div className="  text-white   p-4 w-1/6 " onClick={() => setAddBookModal(false)}><i class="  fa fa-window-close" aria-hidden="true"></i></div>
                  {/* input start */}
                  <div className='p-5' >
                    <span className="relative   w-1/3">
                      <input onChange={(event) => setAddBookInput(event.target.value)} placeholder="Book Name..." className=" bg-white text-black  border outline-none border-blue-900  rounded py-3 px-2 pl-3 " />

                    </span>
                  </div>
                  {/* input end */}
                  {/* btn */}
                  <div className="space-x-14 p-2 mb-3">
                    <button onClick={createNewBook}
                      className="border-solid rounded-tl-3xl   text-center  font-bold hover:bg-gradient-to-r from-blue-900 to-gray-800 hover:text-white text-white border border-[#1F387E] hover:border-white rounded  py-2 px-8 ">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              :

              null}

            {/* mine book div end */}





            {addBookMain == true ?
              <div id="main" className="  h-full">

                <div id="para" className="flex flex-row   flex-wrap h-auto flex-grow  justify-center items-center ">

                  {/* create new book div book name waly button sy open hoti */}
                  <div id="createbook" className=" fixed inset-0 lg:relative  bg-gradient-to-r from-gray-900 to-blue-900   border-2 border-blue-900 lg:w-full bg h-auto">
                    {/* input */}
                    <div className="lg:mb-8 p-4 mb-6 ">
                      <span className="relative  w-1/3">
                        <input aria-label="search" type="search" id="search" placeholder="Search" className="lg:w-1/3  bg-white text-black  border outline-none border-blue-900  rounded py-3 px-2 pl-10 " />
                        <div className="absolute search-icon -mt-8 " style={{ left: '.8rem' }}>
                          <svg className="fill-current pointer-events-none text-black w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                          </svg>
                        </div>
                      </span>

                      <div
                        // onClick={() => close("createbook")}
                        className=" text-start text-white  w-1/6 -mt-14 p-2" onClick={() => setAddBookMain(false)}><i class="fa fa-window-close" aria-hidden="true"></i></div>
                    </div>





                    <div className=" mb-6 p-2 flex lg:text-left text-white text-lg   lg:w-full w-full">

                      {/* catigaaryyy */}
                      {/* 1 */}
                      <div className=" py-2 rounded-tl-3xl  flex border border-blue-900 hover:border-white w-1/3">
                        <div className=" w-1/3 pr-1 text-right">
                          <i class="fa fa-plus-circle pr-1 text-green-600" aria-hidden="true"></i>
                        </div>
                        <div className="w-1/3 font-bold text-left">Cash in </div>
                        <div id="cashoutdiv" className="w-1/3 font-bold  text-center">{cashinSum}</div>
                      </div>



                      {/* 2 */}
                      <div className=" py-2  flex border border-blue-900 hover:border-white w-1/3">
                        <div className="w-1/3 pr-1 text-right">
                          <i class="fa fa-minus-circle pr-1 text-red-600" aria-hidden="true"></i>
                        </div>
                        <div className="w-1/3 font-bold text-left">Cash Out</div>
                        <div className="w-1/3 font-bold  text-center">{cashOutSum}</div>
                      </div>

                      {/* 3 */}
                      <div className=" rounded-tr-3xl  flex border py-2 border-blue-900 hover:border-white w-1/3">
                        <div className="w-1/3 pr-1 text-right">
                          <i class="fa fa-balance-scale pr-1 text-blue-400" aria-hidden="true"></i>
                        </div>
                        <div className=" w-1/3  font-bold text-left">Net Balance</div>
                        <div className=" w-1/3 font-bold  text-center">{cashinSum - cashOutSum}</div>
                      </div>






                    </div>



                    {/* btn cash in out */}
                    <div className="space-x-14 p-2 mb-3">
                      <button
                        onClick={() => cashModal(true)}
                        className="border-solid rounded-tl-3xl   text-center  font-bold hover:bg-gradient-to-r from-blue-900 to-gray-800 hover:text-white text-white border border-[#1F387E] hover:border-white rounded  py-2 px-8 ">

                        Cash In
                      </button>

                      <button
                        onClick={() => cashModal(false)}
                        className="border-solid rounded-tl-3xl   text-center  font-bold hover:bg-gradient-to-r from-blue-900 to-gray-800 hover:text-white text-white border border-[#1F387E] rounded hover:border-white py-2 px-7">

                        Cash Out
                      </button>
                    </div>

                    {/* add entery div nav*/}
                    <div className="px-2">
                      <div className="border border-white p-2 w-full font-bold flex">
                        <div className="text-white w-1/6 ">Date</div>
                        <div className="text-white w-1/6 ">Time</div>
                        <div className="text-white w-1/6 ">Details</div>
                        <div className="text-white w-1/6 ">Category</div>
                        <div className="text-white w-1/6 ">Mode</div>
                        <div className="text-white w-40 ">Amount</div>

                      </div>
                    </div>

                    {/* add entery */}

                    {
                      nameFilter?.map((value) => (
                        <>
                          {/* {console.log("looog", value)} */}
                          <div className="px-2">
                            <div id="dell" className="p-2 w-full font-bold flex">
                              <div id="dell" className="text-white w-1/6 ">{value.date}</div>
                              <div id="dell" className="text-white w-1/6 ">{value.time}</div>
                              <div id="dell" className="text-white w-1/6 " >{value.remark}</div>
                              <div id="dell" className="text-white w-1/6 ">{value.category}</div>
                              <div id="dell" className="text-white w-1/6 ">{value.paymentType}</div>
                              <div id="dell" className={`${value.cashIn == true ? "text-green-600 w-40" : " text-red-600 w-40"}  `}>{value.amount} </div>
                              <button
                                onClick={() => del(value.time)}
                                className="w-12"><i class="fa fa-trash text-white " aria-hidden="true"></i></button>


                            </div>
                          </div>
                        </>
                      ))}


                  </div>






                  {/* cash in add payment div jo cash in k button sy open hoti */}
                  {addCashModal == true ?
                    <div className="fixed inset-0 backdrop-blur-sm   flex justify-center items-center z-20" id="paymentdiv_container  ">
                      <div id="paymentdiv" className="paymentdiv mr-14 lg:mr-0  mt-12 rounded bg-gradient-to-r from-gray-900 to-blue-900 container border-2 border-blue-900 lg:w-1/2 w-4/5 h-auto ">
                        <div className=" border-b flex">

                          <div className="w-1/2 text-white text-start p-4  text-2xl ">Add Cash In </div>
                          <div className=" text-white text-end p-4 w-1/2">
                            <i
                              onClick={() => setAddCashModal(false)}

                              class="fa fa-window-close" aria-hidden="true"></i>
                          </div>

                        </div>
                        <div className="flex p-2">
                          {/* date */}
                          <div id="date" className="  text-white p-2  lg:w-1/2  h-10">
                            <i class=" p-2 text-white" aria-hidden="true">{new Date().toDateString()}</i>
                          </div>
                          {/* time */}
                          <div id="Time" className="  text-white p-2  w-1/2 h-10">
                            <i class=" p-2   text-white" aria-hidden="true">{new Date().toLocaleTimeString()}</i>
                          </div>
                        </div>
                        {/* input */}
                        <div className="mb-2 p-2  ">
                          <span cclassName="relative  w-1/4">
                            <input onChange={(event) => setAddAmount(event.target.value)} type="number" placeholder="Amount" className="w-2/3 bg-white text-black font-boldq border outline-none border-blue-900  rounded py-3 px-2 pl-10 " id="inputcash" />
                          </span>
                        </div>
                        {/* remarks input */}

                        <div className=" p-2  w-full ">
                          <span className="relative  ">
                            <input onChange={(event) => setAddRemark(event.target.value)} type="text" id="remarkinput" placeholder="Remark" className="w-2/3 bg-white text-black font-boldq border outline-none border-blue-900 rounded py-3  pl-10 " />
                          </span>
                        </div>
                        {/* Category input */}
                        <div className=" justify-center  flex p-4 mb-4 ">
                          <div className="w-1/2  justify-end flex">
                            <select onChange={(event) => setAddCategory(event.target.value)} className="bg-white mr-1 text-gray-400 py-3  px-2 w-2/3 rounded"  >
                              <option value={""}>Search or Select</option>
                              <option>Bill</option>
                              <option>Food</option>
                              <option>Labour Chargers</option>


                            </select>
                          </div>



                          <div className="w-1/2  justify-start flex ">
                            <select onChange={(event) => setAddPaymentMode(event.target.value)} className="bg-white ml-1 text-gray-400  py-3 px-2 w-2/3 rounded"  >
                              <option value={""}>Payment Mode</option>
                              <option>Cash</option>
                              <option>Online</option>



                            </select>
                          </div>
                        </div>
                        {/* save */}
                        <div className="p-4">
                          <button
                            onClick={saved}
                            className="border-solid rounded-tl-3xl   text-center  font-bold hover:bg-gradient-to-r from-blue-900 to-gray-800 hover:text-white text-white border border-[#1F387E] hover:border-white rounded  py-3 px-12 ">

                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    : null}




                </div>
              </div>
              :
              null
            }
          </section>
        </div>
      </main></div>
    </>

  )
}

export default Main