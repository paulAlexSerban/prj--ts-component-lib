#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

source ../.env.development

# Parse command-line options
while getopts ":m:p:e:" opt; do
  case $opt in
  e) ENV="$OPTARG" ;;
  p) PHASE="$OPTARG" ;;
  *) usage ;;
  esac
done

# Shift the options and arguments so that $1 refers to the first non-option argument
shift $((OPTIND - 1))

# set some default values
if [[ -z $ENV ]]; then
  ENV=dev
fi

if [[ $ENV == "dev" ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
  export ENV_NAME="local-docker"
elif [[ $ENV == "gh_pages" ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
elif [[ $ENV == 'prod' ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
fi

export ASSETS_PATH="https://s3.eu-central-1.amazonaws.com/assets.prj--js-component-lib"

# function getAssets() {
#   # Define source and destination directories.
#   src_dir="../../../assets/dist"
#   dest_dir="../dist/assets"

#   # Check if the destination directory exists.
#   if [ -d "$dest_dir" ]; then
#     # If the destination directory exists, remove everything inside of it.
#     echo "Directory $dest_dir exists. Deleting its contents."
#     rm -rfv "$dest_dir/*"
#   else
#     # If the destination directory doesn't exist, create it along with its parent 'dist'.
#     echo "Directory $dest_dir does not exist. Creating it."
#     mkdir -p "$dest_dir/assets"
#   fi

#   # Check if the source directory exists and is not empty.
#   if [ -d "$src_dir" ] && [ "$(ls -A "$src_dir")" ]; then
#     # If the source directory exists and is not empty, copy everything into the destination directory.
#     echo "Copying assets from $src_dir to $dest_dir."
#     cp -rfv "$src_dir"/* "$dest_dir"
#   else
#     # If the source directory does not exist or is empty, print an error message and exit.
#     echo "Source directory $src_dir does not exist or is empty. Exiting script."
#     exit 1
#   fi

#   echo "Assets copy completed."
# }
# getAssets
echo "👀 👀 👀 👀"
npm --prefix .. run watch
