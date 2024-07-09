
//components
import NavbarSelector from "./(components)/navbar/navbar-selector"
import Footer from "./(components)/footer/footer"

export default function LandingLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (

        <div className="flex flex-col">
            {/* navbar */}
            <NavbarSelector></NavbarSelector>
            <main className="mt-[85px] lg:mt-[100px] min-h-screen">
                {children}
            </main>
            {/* footer */}
            <Footer></Footer>
        </div>

    )
}