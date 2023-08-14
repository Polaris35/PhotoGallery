import Header from '@/app/components/Header'
import Grid from '@/app/components/Grid'
import PopupStack from './components/Alert/PopupStack'

export default function Home() {
    return (
        <>
            <div className={'min-h-full max-h-screen main_layout'}>
                <Header />
                <Grid />
            </div>
            <PopupStack />
        </>
    )
}
