/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   kitchen_utils.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: lbatista <lbatista@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/29 18:21:56 by lbatista          #+#    #+#             */
/*   Updated: 2023/05/29 18:22:01 by lbatista         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <philosofers.h>

int	check_die(long time, t_philo *philo)
{
	long	last_eat;

	last_eat = 0;
	pthread_mutex_lock(philo->values->last_meal_locker);
	last_eat = philo->last_eat;
	pthread_mutex_unlock(philo->values->last_meal_locker);
	if (time - last_eat > philo->values->time_die)
		return (1);
	return (0);
}

void	declare_death(t_philo *philo)
{
	pthread_mutex_lock(philo->values->died_locker);
	philo->values->someone_die = 1;
	pthread_mutex_unlock(philo->values->died_locker);
}
