"use client"

const Navbar = () => {


    return (
        <div className="fixed top-0 w-full py-5 z-50 bg-[#111318]/90 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="container h-full mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-black tracking-tighter text-[#b6c4ff]">
                        ELP
                    </h2>
                    <p className="text-md font-medium tracking-tighter text-[#b6c4ff]">
                        Estadisticas Liga Profesional
                    </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <button className="py-3 uppercase text-lg font-semibold text-[#b6c4ff] hover:cursor-pointer hover:bg-[#203056] rounded-sm px-4 leading-none bg-[#1a2133] transition-all ease-in-out ">
                        Iniciar Sesión
                    </button>
                    <button className="py-3 uppercase text-lg font-semibold text-[#030c33] hover:cursor-pointer hover:bg-[#0ac11f] rounded-sm px-4 leading-none bg-[#05a32d] transition-all ease-in-out ">
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar