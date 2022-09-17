import { HeaderContainer } from './styles'
import igniteLogo from '../../assets/images/logo-ignite.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
export default function Header() {
  return (
    <HeaderContainer>
      <img
        src={igniteLogo}
        alt="Ignite logo, 2 green triangles inside each other "
      />
      <nav>
        <NavLink to="/" end title="Timer button nav">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History button nav">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
