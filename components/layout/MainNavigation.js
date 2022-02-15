import classes from './MainNavigation.module.css';
import Link from 'next/link';
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Sydney Foodies</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Resturants</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
