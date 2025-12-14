const ProfileForm = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<form style={{ display: 'flex', flexDirection: 'column' }}>
				<input type='text' placeholder='Иван' />
				<input type='email' placeholder='example@gmail.com' />
				<input type='password' placeholder='********' />
				<textarea></textarea>
				<button>Редактировать</button>
				<button>Удалить аккаунт</button>
			</form>
			<div>
				<img src='' alt='Не удалось загрузить фото' />
				<button>Изменить</button>
			</div>
		</div>
	);
};

export default ProfileForm;
