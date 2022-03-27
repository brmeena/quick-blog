import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { authService } from 'src/services/authservice'
import roles from 'src/constants/roles'
import AdminSideBarNav from "./sidebars/AdminSideBarNav"
import EditorNavigation from './sidebars/EditorSideBarNav'
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const user = authService.getUser
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarNav>
        <SimpleBar>
          {(user.role==roles.ADMIN && (
            <AdminSideBarNav/>
          ))
          }
          {((user.role==roles.EDITOR || user.role==roles.DEMO)&& (
            <EditorNavigation/>
          ))
          }
           </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
