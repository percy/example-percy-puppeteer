workflow "New workflow" {
  on = "push"
  resolves = ["cat-event"]
}

action "show-env" {
  uses = "actions/action-builder/shell@master"
  runs = "env"
}

action "cat-event" {
  uses = "actions/action-builder/shell@master"
  runs = "cat $(GITHUB_EVENT_PATH)"
  needs = ["env"]
}
