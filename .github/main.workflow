workflow "New workflow" {
  on = "push"
  resolves = ["cat-event"]
}

action "show-env" {
  runs = "env"
}

action "cat-event" {
  runs = "cat $(GITHUB_EVENT_PATH)"
  needs = ["env"]
}
