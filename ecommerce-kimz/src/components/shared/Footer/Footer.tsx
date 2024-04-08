import styles from './styles.module.css'
const { footerContainer } = styles

const Footer = () => {
  return (
    <div className={footerContainer}>
      © 2024 <strong>HEXASHOP</strong>. All rights reserved.
    </div>
  )
}

export default Footer
