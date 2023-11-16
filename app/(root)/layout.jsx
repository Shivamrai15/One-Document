import Navbar from "./_components/Navbar";


const RootLayout = ({children}) => {
    return (
        <div className="h-full">
            <Navbar/>
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;