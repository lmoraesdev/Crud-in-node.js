/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: lbatista <lbatista@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/29 18:22:50 by lbatista          #+#    #+#             */
/*   Updated: 2023/05/29 18:23:02 by lbatista         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <philosofers.h>

int	main(int argc, char **argv)
{
	t_philo			*philo;
	t_values		values;
	pthread_mutex_t	*forks;

	philo = NULL;
	forks = NULL;
	validate(argv, argc);
	init(argv, &values, &philo, &forks);
	lets_lunch(philo);
	close_dinner(philo, &values, forks);
	return (0);
}
