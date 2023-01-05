import styles from '../styles/Home.module.css'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/insert">Insert</Link>
        </li>
        <li>
          <Link href="/update">Update</Link>
        </li>
        <li>
          <Link href="/delete">Delete</Link>
        </li>
        <li>
          <Link href="/viewing">Stats</Link>
        </li>
      </ul>
    </div>
  )
}