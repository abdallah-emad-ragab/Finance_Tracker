export default function Footer() {
    return (
        <footer className="bg-gray-600 text-white py-4 m-0 rounded-tl-2xl rounded-tr-2xl">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.</p>
                <p className="text-sm mt-1">Made with ❤️ by <a href="https://abdallah-emad-ragab.vercel.app/" className="text-blue-500 hover:underline" target="_blank">Abdallah Emad Ragab</a></p>
            </div>
        </footer>
    )
}