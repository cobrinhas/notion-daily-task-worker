import { Env, fromEnv } from "./config";
import handler from "./handler";

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		const config = fromEnv(env);

		return handler(config);
	},
};
