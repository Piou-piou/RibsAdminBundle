<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UploaderController extends AbstractController
{
    /**
     * @Route("/upload/${folder}", name="ribsadmin_upload", requirements={"folder"=".+"})
     * @param Request $request
     * @param ParameterBagInterface $parameter
     * @param string $folder
     * @return JsonResponse
     */
    public function upload(Request $request, ParameterBagInterface $parameter, string $folder = ""): JsonResponse
    {
        $success = false;
        $new_filename = null;
        $file = null;
        $upload_dir = $folder != "" ? '../'.$folder : $parameter->get("ribs_admin.upload_dir");

        if ($request->files && $request->files->has("file")) {
            /** @var UploadedFile $file */
            $file = $request->files->get("file");
            $date = new \DateTime();
            $extension = explode(".", $file->getFilename());
            $new_filename = uniqid() . "-" . $date->getTimestamp() . "." . end($extension);

            if (!is_dir($upload_dir)) {
                $this->createRecursiveDirFromRoot($upload_dir);
            }

            if ($file->move($upload_dir, $new_filename)) {
                $success = true;
            }
        }

        return new JsonResponse([
            "original_filename" => $file ? $file->getClientOriginalName() : null,
            "new_filename" => $new_filename,
            "file_path" => $upload_dir . "/" . $new_filename,
            "success" => $success
        ]);
    }

    /**
     * @Route("/delete-uploaded-file/${folder}", name="ribsadmin_delete_uploaded_file", requirements={"folder"=".+"})
     * @param Request $request
     * @param ParameterBagInterface $parameter
     * @param string $folder
     * @return JsonResponse
     */
    public function deleteUploadedFile(Request $request, ParameterBagInterface $parameter, string $folder = ""): JsonResponse
    {
        $success = false;
        if ($request->get("file_path") && $request->get("file_name")) {
            $fs = new Filesystem();
            $upload_dir = $folder != "" ? '../'.$folder : $parameter->get("ribs_admin.upload_dir");

            if (is_file($request->get("file_path"))) {
                $fs->remove($request->get("file_path"));
            } elseif (is_file($upload_dir . "/" . $request->get("file_name"))) {
                $fs->remove($upload_dir . "/" . $request->get("file_name"));
            }
            $success = true;
        }

        return new JsonResponse([
            "success" => $success
        ]);
    }

    /**
     * @Route("/retrieve-uploaded-files/${folder}", name="ribsadmin_retrieve_uploaded_file", requirements={"folder"=".+"})
     * @param Request $request
     * @param ParameterBagInterface $parameter
     * @param string $folder
     * @return JsonResponse
     */
    public function retrieveUploadedFile(Request $request, ParameterBagInterface $parameter, string $folder = ""): JsonResponse
    {
        $success = true;
        $upload_dir = $folder != "" ? '../'.$folder : $parameter->get("ribs_admin.upload_dir");
        $fs = new Filesystem();
        $finder = new Finder();
        $finder->files()->in($upload_dir);
        $files = [];
        $index = 0;

        foreach ($finder as $file) {
            $files[] = [
                "file_path" => $parameter->get("ribs_admin.base_upload_url") . $file->getFilename(),
                "filename" => $file->getFilename(),
                "index" => $index
            ];

            $index++;
        }

        return new JsonResponse([
            "success" => $success,
            "files" => $files
        ]);
    }

    /**
     * method that create a tree of folders on each slash
     * @param $path
     * @return string
     */
    private function createRecursiveDirFromRoot($path)
    {
        $fs = new Filesystem();
        $new_path = $path;
        $folders = explode("/", $path);

        foreach ($folders as $index => $folder) {
            $new_path .= $folder;

            if (!$fs->exists($new_path)) {
                $fs->mkdir($new_path);
            }

            if ($index + 1 < count($folders)) {
                $new_path .= "/";
            }
        }

        return $new_path;
    }
}
