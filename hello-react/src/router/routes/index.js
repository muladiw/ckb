// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/home"

const Home = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Error = lazy(() => import("../../views/Error"))
const User = lazy(() => import("../../views/user"))
const UserTambah = lazy(() => import("../../views/user/Tambah"))
const UserUbah = lazy(() => import("../../views/user/Ubah"))
const Mahasiswa = lazy(() => import("../../views/mahasiswa"))
const MahasiswaTambah = lazy(() => import("../../views/mahasiswa/Tambah"))
const MahasiswaUbah = lazy(() => import("../../views/mahasiswa/Ubah"))
const MataKuliah = lazy(() => import("../../views/mataKuliah"))
const MataKuliahTambah = lazy(() => import("../../views/mataKuliah/Tambah"))
const MataKuliahUbah = lazy(() => import("../../views/mataKuliah/Ubah"))
const NilaiMahasiswa = lazy(() => import("../../views/nilaiMahasiswa"))
const NilaiMahasiswaTambah = lazy(() => import("../../views/nilaiMahasiswa/Tambah"))
const NilaiMahasiswaUbah = lazy(() => import("../../views/nilaiMahasiswa/Ubah"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/second-page",
    element: <SecondPage />
  },
  {
    path: "/user",
    element: <User />
  },
  {
    path: "/user/tambah",
    element: <UserTambah />
  },
  {
    path: "/user/ubah/:id",
    element: <UserUbah />
  },
  {
    path: "/mata-kuliah",
    element: <MataKuliah />
  },
  {
    path: "/mata-kuliah/tambah",
    element: <MataKuliahTambah />
  },
  {
    path: "/mata-kuliah/ubah/:id",
    element: <MataKuliahUbah />
  },
  {
    path: "/mahasiswa",
    element: <Mahasiswa />
  },
  {
    path: "/mahasiswa/tambah",
    element: <MahasiswaTambah />
  },
  {
    path: "/mahasiswa/ubah/:id",
    element: <MahasiswaUbah />
  },
  {
    path: "/nilai-mahasiswa",
    element: <NilaiMahasiswa />
  },
  {
    path: "/nilai-mahasiswa/tambah",
    element: <NilaiMahasiswaTambah />
  },
  {
    path: "/nilai-mahasiswa/ubah/:id",
    element: <NilaiMahasiswaUbah />
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
