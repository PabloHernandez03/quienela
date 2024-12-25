import DashBoardView from "@/views/DashBoardViews"
import Logo from "@/components/Logo"

export default function AppLayout() {
    return(
        <>
            <header className="bg-fifth">
                <div className="max-w-screen-2xl mx-auto flex flex-row justify-center items-center">
                    <div>
                        <Logo />
                    </div>
                </div>
            </header>
            
            <DashBoardView />

            <footer className="py-5 bg-fifth">
                <p className="text-center font-mono text-white">       
                    Todos los derechos reservados, {new Date().getFullYear()}
                </p>
            </footer>
        </>
    )
}