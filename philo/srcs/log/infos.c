/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   infos.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: lbatista <lbatista@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/29 18:20:31 by lbatista          #+#    #+#             */
/*   Updated: 2023/05/29 18:20:37 by lbatista         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <philosofers.h>

void	show_inform(t_philo *philo, char *what_is_doing)
{
	long	time;

	pthread_mutex_lock(philo->values->info_locker);
	time = passed_time(philo->values->first_eat);
	pthread_mutex_lock(philo->values->died_locker);
	if (!philo->values->someone_die)
		printf("%ld %d %s \n", time, philo->id, what_is_doing);
	pthread_mutex_unlock(philo->values->died_locker);
	pthread_mutex_unlock(philo->values->info_locker);
}
