import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <>

      <Link 
        to='/'
        className='flex justify-center items-center text-white text-4xl font-bold my-4'
      >
        <h1 className="uppercase italic">
          quienela
        </h1>
      </Link>

    </>

  )
}
