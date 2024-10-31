import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header'
import { SideBar } from './components/side_bar'
import { Home } from './components/pages/home'
import { Footer } from './components/footer'
import { ReadData } from './components/pages/read-data/read-data'
import { HistoryReading } from './components/pages/history-reading'
import { UploadConfig } from './components/pages/upload-config'
import { AdminContext, initializeContext } from './contexts/admin-context'

function App() {
  const value = initializeContext();
  return (
    <>
    <BrowserRouter>
      <AdminContext.Provider value={value}>
        <SideBar />
        <Header />
        <div className='right_col' role="main">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/read-data" element={<ReadData />}></Route>
              <Route path="/history" element={<HistoryReading />}></Route>
              <Route path="/upload-config" element={<UploadConfig />}></Route>
            </Routes>
        </div>
        <Footer />
      </AdminContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
