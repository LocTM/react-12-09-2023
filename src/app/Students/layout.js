import { AppGuard } from "../Components/app-guard";


export default function Layout({ children }) {
  return <AppGuard>{children}</AppGuard>
}
