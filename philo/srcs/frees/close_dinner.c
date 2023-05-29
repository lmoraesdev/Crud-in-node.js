/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   close_dinner.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: lbatista <lbatista@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/29 18:18:51 by lbatista          #+#    #+#             */
/*   Updated: 2023/05/29 18:19:00 by lbatista         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <philosofers.h>

static void	clean_table(t_philo *philo, pthread_mutex_t *forks)
{
	int	i;

	i = 0;
	while (i < philo->values->num_philo)
	{
		pthread_mutex_destroy(&forks[i]);
		pthread_mutex_destroy(philo[i].eating);
		free(philo[i].eating);
		i++;
	}
	free(philo);
	free(forks);
}

static void	erase_values(t_values *values)
{
	pthread_mutex_destroy(values->check_meals_locker);
	pthread_mutex_destroy(values->died_locker);
	pthread_mutex_destroy(values->info_locker);
	pthread_mutex_destroy(values->last_meal_locker);
	pthread_mutex_destroy(values->set_time_locker);
	free(values->check_meals_locker);
	free(values->set_time_locker);
	free(values->died_locker);
	free(values->info_locker);
	free(values->last_meal_locker);
}

void	close_dinner(t_philo *philo, t_values *values, pthread_mutex_t *forks)
{
	clean_table(philo, forks);
	erase_values(values);
}
