load("//devtools/python/blaze:pytype.bzl", "pytype_strict_library")

pytype_strict_library(
    name = "test_fuzzingclient",
    srcs = ["test_fuzzingclient.py"],
    deps = ["//third_party/py/websocket"],
)

Fileset(
    name = "all_files",
    entries = [FilesetEntry(files = glob(["**"]))],
    visibility = ["//third_party/py/websocket:__pkg__"],
)
