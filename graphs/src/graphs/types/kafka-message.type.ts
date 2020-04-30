type EventType = 'UPSERT' | 'DELETE';
export type KafkaMessageType<Payload> = {
  type: EventType;
  payload: Payload;
};
