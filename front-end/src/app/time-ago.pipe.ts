import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]) {
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    // Time intervals in seconds

    const intervals = {
      'year': 31536000,
      'month': 2592000,
      'week': 604800,
      'day': 86400,
      'hour': 3600,
      'minute': 60,
      'second': 1
    };

    for (const [interval, secondsInInterval] of Object.entries(intervals)) {
      const intervalCount = Math.floor(seconds / secondsInInterval);
      if (intervalCount > 0) {
        return intervalCount === 1 ? `1 ${interval} ago` : `${intervalCount} ${interval}s ago`;
      }
    }

    return 'Just now';
  }

}

