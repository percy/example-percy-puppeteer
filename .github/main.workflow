workflow "New workflow" {
  on = "push"
  resolves = ["cat-event"]
}

action "show-env" {
  uses = "bash"
  runs = "env"
}

action "cat-event" {
  uses = "bash"
  runs = "cat $(GITHUB_EVENT_PATH)"
  needs = ["env"]
}
