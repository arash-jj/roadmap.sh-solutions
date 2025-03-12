import './main.css'
import PropTypes from 'prop-types';
import FlashCards from './components/FlashCards'
function App() {
  return (
    <>
      <div className="mt-20 m-auto flex justify-center  flex-col p-10 max-w-1/2 shadow-2xl rounded-2xl">
        <header>
          <h1 className='text-2xl my-4'>Flash Cards</h1>
        </header>
        <main>
          <FlashCards />
        </main>
      </div>
    </>
  )
}

export default App
