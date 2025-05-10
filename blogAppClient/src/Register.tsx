
function RegisterPage(){
    return(
<main className="max-w-screen-xl mx-auto">
  <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
    <h1 className="font-bold text-3xl mx-auto">Register</h1>
    <input type="text" placeholder="Username" className="p-2 border rounded" />
    <input type="password" placeholder="Password" className="p-2 border rounded" />
    <button className="p-2 bg-black text-white rounded hover:bg-gray-800">
      Register
    </button>
  </div>
</main>
    )
}


export default RegisterPage