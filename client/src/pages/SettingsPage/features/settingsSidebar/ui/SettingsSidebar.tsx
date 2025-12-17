import { logoutRequest } from '@features/logout';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { NavLink } from 'react-router-dom';

const SettingsSidebar = () => {
	const dispatch = useAppDispatch();
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='profile'>Профиль</NavLink>
				</li>
				<li>
					<NavLink to='projects'>Проекты</NavLink>
				</li>
				<li>
					<NavLink to='view'>Оформление</NavLink>
				</li>
				<hr />
				<li>
					<button onClick={() => dispatch(logoutRequest())}>
						Выйти
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default SettingsSidebar;
