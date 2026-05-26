/*
 * Topic registry. To add a new topic:
 *   1. Drop a JSON file in this folder (see KnowledgeBase.md for the schema).
 *   2. Import it below and add it to the TOPICS array.
 *
 * The order here is the order shown in the sidebar.
 */
import ai from "./ai.json";
import ai2 from "./ai2.json";
import nodejs from "./nodejs.json";
import devops from "./devops.json";

const TOPICS = [ai, ai2, nodejs, devops];

export default TOPICS;
