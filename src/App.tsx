import Resume from './pages/Resume.page'
import data from "./mock/data.json"
import { useLanguage } from './context/IntlProviderContext'
import Navigation from './components/Navigation/Navigation.component'

function App() {
  const { language } = useLanguage();
  return (
    <div
      dir={language === "en" ? "ltr" : 'rtl'}
      className={language === "en" ? "en-font" : 'fa-font'}
    >
      <Navigation />
      <div className='flex flex-col items-center'>
        <Resume data={data} />
      </div>
    </div>
  )
}

export default App
