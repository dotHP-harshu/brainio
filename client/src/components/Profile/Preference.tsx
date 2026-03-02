import { themes } from "../../data"
import { useTheme } from "../../hooks/useTheme"




function Preference() {
    const {theme:currentTheme, applyTheme}= useTheme()
  return (
    <>
    <h4 className="capitalize font-bold">preference <small>(saved locally)</small></h4>
    <div className=" box box-shadow p-4 grid grid-cols-4 w-fit gap-4">

{
    themes.map((theme)=>(
        <div onClick={()=>applyTheme(theme.id)} key={theme.id} className={`flex justify-center items-center gap-2 p-2 cursor-pointer border w-fit ${theme.id=== currentTheme.id? "border-2 border-primary bg-secondary/40": "border-text"}`}>
            <span className={`h-6 w-6 aspect-square block border`} style={{backgroundColor:theme.colors.primary}}></span>
            <span className={`h-6 w-6 aspect-square block border`} style={{backgroundColor:theme.colors.secondary}}></span>
        </div>
    ))
}
    </div>
        
    </>
  )
}

export default Preference