import Image from 'next/image'
import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import PopupStack from "@/app/components/Alert/PopupStack"
import {AlertProvider} from "@/app/components/Alert/AlertContext";

export default function Home() {
  return (
      <AlertProvider>
          <Header/>
          <Grid/>
          <PopupStack/>
      </AlertProvider>
  )
}
