import { host } from '../constans';

import type { TimelinePayload } from '~/types/timeline';

export function fetchHTML({ userId, type, page }: TimelinePayload) {
  if (!userId)
    return fetch(`${host}/timeline?type=${type}&page=${page}`);

  return fetch(`${host}/user/${userId}/timeline?type=${type}&page=${page}&ajax=1`);
}
